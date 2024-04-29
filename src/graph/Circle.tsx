interface CircleProps {
  cx?: number;
  cy?: number;
  r: number;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
}

export const Circle = (props: CircleProps) => {
  return (
    <circle
      cx={props.cx}
      cy={props.cy}
      r={props.r}
      fill={props.fill}
      stroke={props.stroke ? props.stroke : "none"}
      strokeWidth={props.strokeWidth ? props.strokeWidth : 0}
    />
  );
};
