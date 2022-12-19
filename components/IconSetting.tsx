import { SettingsIcon } from "@chakra-ui/icons";
import { keyframes, usePrefersReducedMotion } from "@chakra-ui/react";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;
type IConfig = {
  password?: string;
  time?: number;
};
export const IconSetting = ({ config }: { config: IConfig | undefined}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 6s linear`;

  return (
    <SettingsIcon
      animation={animation}
      color={config?.password ? "blue.600" : "black"}
    />
  );
};
