import { IressIcon, type IressIconProps } from '../../Icon';
import { IressPanel } from '../../Panel';
import { IressRadio } from '../../Radio';
import { IressStack } from '../../Stack';
import { IressText } from '../../Text';

interface CustomRadioProps {
  value: string;
  label: string;
  icon: IressIconProps['name'];
}

const renderRadio = (
  { value, label, icon }: CustomRadioProps,
  testId?: string,
) => (
  <IressRadio value={value} key={value} data-testid={testId}>
    <IressPanel textAlign="center" bg="transparent" p="lg">
      <IressStack gap="md">
        <IressIcon name={icon} textStyle="typography.heading.1" />
        <IressText textStyle="typography.heading.4" noGutter>
          {label}
        </IressText>
      </IressStack>
    </IressPanel>
  </IressRadio>
);

export function getFinancialReviewChildren(
  items: CustomRadioProps[] = [
    { value: 'home', label: 'Buying my first home', icon: 'house' },
    { value: 'holiday', label: 'Saving for a holiday', icon: 'mountain' },
    { value: 'debt', label: 'Reducing my debt', icon: 'credit-card' },
  ],
  testId?: string,
) {
  return items.map((item) => renderRadio(item, testId));
}

export function getFinancialReviewManyChildren() {
  return getFinancialReviewChildren([
    { value: 'retirement', label: 'Retirement', icon: 'tree-palm' },
    { value: 'home', label: 'Buying my first home', icon: 'house' },
    { value: 'holiday', label: 'Saving for a holiday', icon: 'mountain' },
    {
      value: 'education',
      label: "Saving for my child's education",
      icon: 'graduation-cap',
    },
    { value: 'emergency', label: 'Saving for emergency', icon: 'medkit' },
    {
      value: 'hobby',
      label: 'Spending more time on my hobbies',
      icon: 'bicycle',
    },
    { value: 'debt', label: 'Reducing my debt', icon: 'chart-line-down' },
    { value: 'business', label: 'Starting a business', icon: 'user-tie' },
  ]);
}
