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
    <IressPanel textAlign="center" bg="transparent" px="none" py="md" mr="-md">
      <IressStack gap="xs">
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
    { value: 'home', label: 'Buying my first home', icon: 'cottage' },
    {
      value: 'holiday',
      label: 'Saving for a holiday',
      icon: 'downhill_skiing',
    },
    { value: 'debt', label: 'Reducing my debt', icon: 'credit_card' },
  ],
  testId?: string,
) {
  return items.map((item) => renderRadio(item, testId));
}

export function getFinancialReviewManyChildren() {
  return getFinancialReviewChildren([
    { value: 'retirement', label: 'Retirement', icon: 'houseboat' },
    { value: 'home', label: 'Buying my first home', icon: 'cottage' },
    {
      value: 'holiday',
      label: 'Saving for a holiday',
      icon: 'downhill_skiing',
    },
    {
      value: 'education',
      label: "Saving for my child's education",
      icon: 'school',
    },
    {
      value: 'emergency',
      label: 'Saving for emergency',
      icon: 'medical_services',
    },
    {
      value: 'hobby',
      label: 'Spending more time on my hobbies',
      icon: 'pedal_bike',
    },
    { value: 'debt', label: 'Reducing my debt', icon: 'trending_down' },
    {
      value: 'business',
      label: 'Starting a business',
      icon: 'business_center',
    },
  ]);
}
