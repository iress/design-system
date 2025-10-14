import {
  IressButton,
  IressForm,
  IressInput,
  IressFormField,
  IressStack,
  IressIcon,
  IressText,
  IressPanel,
  IressInline,
  type IressInputProps,
} from '@/main';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface TranscriptFormValues {
  transcript: TranscriptData | string;
}

interface TranscriptData {
  content: string;
  size?: number;
  type: 'file' | 'text';
  extension?: string;
  fileName?: string;
  rejectedReasons?: REJECTION_REASONS[];
}

interface TranscriptTextBoxProps {
  value: TranscriptData | string;
  onChange: (data: TranscriptData) => void;
  placeholder?: string;
  rows?: number;
  style?: React.CSSProperties;
  allowedExtensions?: string[];
  maxSizeInMB?: number;
}

interface SubmittedValuesDisplayProps {
  submittedValues: TranscriptFormValues | null;
  title?: string;
}

enum REJECTION_REASONS {
  TYPE = 'type',
  SIZE = 'size',
}

const validateFile =
  (allowedExtensions: string[], maxSizeInMB: number) =>
  (data: TranscriptData | string) => {
    if (
      !!data &&
      typeof data === 'object' &&
      data.type === 'file' &&
      Array.isArray(data.rejectedReasons) &&
      data.rejectedReasons.length > 0
    ) {
      const errors: string[] = [];

      if (data.rejectedReasons.includes(REJECTION_REASONS.TYPE)) {
        errors.push(`Only .${allowedExtensions.join(', ')} accepted`);
      }

      if (data.rejectedReasons.includes(REJECTION_REASONS.SIZE)) {
        errors.push(`File size must be less than ${maxSizeInMB}MB`);
      }

      if (errors.length > 0) {
        return errors.join('. ');
      }
    }

    return true;
  };

const TranscriptTextBox = ({
  value,
  onChange,
  placeholder = 'Copy and paste transcripts OR drag and drop / upload recordings, transcripts or documents here (.txt format).',
  rows = 10,
  style,
  allowedExtensions = ['txt'],
  maxSizeInMB = 10,
}: TranscriptTextBoxProps) => {
  // Extract content and file info from value
  const currentData =
    typeof value === 'string'
      ? { content: value, type: 'text' as const }
      : value;
  const currentFile =
    currentData?.type === 'file' &&
    (!currentData.rejectedReasons || currentData.rejectedReasons.length === 0)
      ? {
          name: currentData.fileName ?? 'Unknown file',
          size: currentData.size,
        }
      : null;

  const createTranscriptData = (
    content: string,
    type: 'file' | 'text',
    additionalData?: Partial<TranscriptData>,
  ): TranscriptData => ({
    content,
    type,
    ...additionalData,
  });

  const handleFileRead = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      onChange(
        createTranscriptData(content, 'file', {
          size: file.size,
          extension: file.name.split('.').pop()?.toLowerCase(),
          fileName: file.name,
        }),
      );
    };
    reader.onerror = () => {
      // Let parent handle errors through validation
      onChange(
        createTranscriptData('', 'file', {
          fileName: file.name,
        }),
      );
    };
    reader.readAsText(file);
  };

  const handleTextChange: IressInputProps<string, number>['onChange'] = (
    _e,
    textContent = '',
  ) => {
    onChange(createTranscriptData(textContent, 'text'));
  };

  const onFileSelected = (files: File[]) => {
    if (files.length === 0) return;

    const file = files[0];
    handleFileRead(file);
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    maxSize: maxSizeInMB * 1024 * 1024,
    accept: allowedExtensions.reduce(
      (acc, ext) => {
        const mimeType =
          ext === 'txt' ? 'text/plain' : 'application/octet-stream';
        acc[mimeType] = acc[mimeType] || [];
        acc[mimeType].push(`.${ext}`);
        return acc;
      },
      {} as Record<string, string[]>,
    ),
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelected(acceptedFiles);
        return;
      }

      if (rejectedFiles.length > 0) {
        const rejectedFile = rejectedFiles[0];
        const { file, errors } = rejectedFile;

        // Map error codes to rejection reasons
        const errorCodeMap = {
          'file-invalid-type': REJECTION_REASONS.TYPE,
          'file-too-large': REJECTION_REASONS.SIZE,
        } as const;

        const rejectedReasons = errors
          .map((error) => errorCodeMap[error.code as keyof typeof errorCodeMap])
          .filter((reason): reason is REJECTION_REASONS => Boolean(reason));

        onChange(
          createTranscriptData('', 'file', {
            fileName: file.name,
            rejectedReasons,
          }),
        );
      }
    },
  });

  const handleUploadClick = () => {
    open();
  };

  const removeFile = () => {
    onChange(createTranscriptData('', 'text'));
  };

  return (
    <IressStack gap="sm">
      <div {...getRootProps()} style={{ position: 'relative' }}>
        <input {...getInputProps()} />
        <IressInput
          value={currentData?.content || ''}
          onChange={handleTextChange}
          rows={rows}
          placeholder={isDragActive ? 'Drop your file here...' : placeholder}
          style={{
            boxSizing: 'border-box',
            border: isDragActive ? '1px dashed #007acc' : undefined,
            backgroundColor: isDragActive ? '#f0f8ff' : undefined,
            ...style,
          }}
        />
      </div>

      {currentFile && (
        <IressPanel>
          <IressInline horizontalAlign="between" verticalAlign="middle">
            <IressText>📄 {currentFile.name}</IressText>
            <IressButton mode="secondary" onClick={removeFile}>
              Remove
            </IressButton>
          </IressInline>
        </IressPanel>
      )}

      <IressButton
        mode="secondary"
        onClick={handleUploadClick}
        prepend={<IressIcon name="upload" />}
      >
        Upload
      </IressButton>
    </IressStack>
  );
};

const SubmittedValuesDisplay: React.FC<SubmittedValuesDisplayProps> = ({
  submittedValues,
  title = 'Submitted Values:',
}) => {
  if (!submittedValues) {
    return null;
  }

  return (
    <IressPanel>
      <IressStack gap="sm">
        <IressText textStyle="typography.body.md.strong">{title}</IressText>
        <IressText>
          <strong>Type:</strong>
          {typeof submittedValues.transcript === 'string'
            ? 'text'
            : submittedValues.transcript.type}
        </IressText>
        <IressText>
          <strong>Content:</strong>
          {typeof submittedValues.transcript === 'string'
            ? submittedValues.transcript
            : submittedValues.transcript.content}
        </IressText>
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.fileName && (
            <IressText>
              <strong>File Name:</strong> {submittedValues.transcript.fileName}
            </IressText>
          )}
        {typeof submittedValues.transcript === 'object' &&
          submittedValues.transcript.size && (
            <IressText>
              <strong>File Size:</strong>
              {(submittedValues.transcript.size / 1024).toFixed(2)} KB
            </IressText>
          )}
      </IressStack>
    </IressPanel>
  );
};

const Heading = () => {
  return (
    <>
      <IressText element="h1">Custom FormField Components</IressText>
      <IressText element="p">
        This demo showcases how to embed any custom component
        (TranscriptTextBox) into IressFormField while leveraging its form
        validation, error handling, and state management without additional
        implementation. When building custom form components, avoid managing
        error message state internally. This helps maintain the IressForm as the
        single source of truth and ensures consistent, predictable UI behavior.
      </IressText>
    </>
  );
};

export const CustomFormFieldComponents = () => {
  const [submittedValues, setSubmittedValues] =
    useState<TranscriptFormValues | null>(null);
  const allowedExtensions = ['txt'];
  const maxSizeInMB = 0.1;

  const handleSubmit = (data: TranscriptFormValues) => {
    setSubmittedValues(data);
    console.log('Form submitted:', data);
  };

  return (
    <>
      <Heading />
      <IressForm<TranscriptFormValues>
        mode="onChange"
        onSubmit={handleSubmit}
        defaultValues={{ transcript: { content: '', type: 'text' } }}
      >
        <IressStack gap="md">
          <IressFormField
            label="Transcript"
            name="transcript"
            hint="Upload or copy and paste transcript here"
            render={(controlledProps) => (
              <TranscriptTextBox
                {...controlledProps}
                allowedExtensions={allowedExtensions}
                maxSizeInMB={maxSizeInMB}
              />
            )}
            rules={{
              required: 'Transcript is required',
              validate: {
                file: validateFile(allowedExtensions, maxSizeInMB),
              },
            }}
          />
          <IressButton type="submit" mode="primary">
            Submit
          </IressButton>
          <SubmittedValuesDisplay submittedValues={submittedValues} />
        </IressStack>
      </IressForm>
    </>
  );
};
