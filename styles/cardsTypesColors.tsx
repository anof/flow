import theme from './theme';

export const getBackgroundColor = (type: string) => {
  switch (type.toLowerCase()) {
    case 'link':
      return theme.palette.info.main;
    case 'flow':
      return theme.palette.warning.main;
    case 'image':
      return theme.palette.success.main;
    default:
      return '#111111';
  }
};