const context = document.createElement('canvas').getContext('2d');

export const measureText = (
  options = {
    text: '',
    name: 'Segoe UI',
    size: 14,
  }
) => {
  //@ts-ignore
  context.font = `${options.size}px ${options.name}`;

  //@ts-ignore
  return context.measureText(options.text).width;
};
