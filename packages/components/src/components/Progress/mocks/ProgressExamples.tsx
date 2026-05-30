import { IressProgress, IressStack } from '@/main';

export function ProgressExamples() {
  return (
    <IressStack gap="md">
      <IressProgress min={0} max={50} value={0} />
      <IressProgress min={10} max={30} value={20} />
      <IressProgress min={0} max={50} value={30} sectionTitle="Step {{current}} of {{max}}" />
      <IressProgress
        min={0}
        max={100}
        value={75}
        backgroundImage="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2858&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </IressStack>
  );
}
