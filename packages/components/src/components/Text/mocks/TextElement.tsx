import { IressStack, IressText } from '@/main';

export function TextElement() {
  return (
    <IressStack gap="spacing.1">
      <IressText element="p">This is a p element.</IressText>
      <IressText element="div">This is a div element.</IressText>
      <IressText element="span">This is a span element.</IressText>
      <IressText element="h1">This is a h1 element.</IressText>
      <IressText element="h2">This is a h2 element.</IressText>
      <IressText element="h3">This is a h3 element.</IressText>
      <IressText element="h4">This is a h4 element.</IressText>
      <IressText element="h5">This is a h5 element.</IressText>
      <IressText element="h6">This is a h6 element.</IressText>
      <IressText element="code">This is a code element.</IressText>
      <IressText element="small">This is a small element.</IressText>
      <IressText element="cite">This is a cite element.</IressText>
      <IressText element="strong">This is a strong element.</IressText>
      <IressText element="em">This is a em element.</IressText>
      <IressText element="a">This is a a element.</IressText>
      <IressText element="blockquote">This is a blockquote element.</IressText>
      <IressText element="pre">This is a pre element.</IressText>
      <IressText element="mark">This is a mark element.</IressText>
    </IressStack>
  );
}
