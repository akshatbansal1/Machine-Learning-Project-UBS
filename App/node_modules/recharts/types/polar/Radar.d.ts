import React, { PureComponent, ReactElement, MouseEvent } from 'react';
import { Props as DotProps } from '../shape/Dot';
import { PresentationAttributes, LegendType, TooltipType, AnimationTiming, DataKey } from '../util/types';
interface RadarPoint {
    x: number;
    y: number;
    cx?: number;
    cy?: number;
    angle?: number;
    radius?: number;
    value?: number;
    payload?: any;
}
declare type RadarDot = ReactElement<SVGElement> | ((props: any) => SVGElement) | DotProps | boolean;
interface RadarProps {
    className?: string;
    dataKey: DataKey<any>;
    angleAxisId?: string | number;
    radiusAxisId?: string | number;
    points?: RadarPoint[];
    shape?: ReactElement<SVGElement> | ((props: any) => SVGElement);
    activeDot?: RadarDot;
    dot?: RadarDot;
    legendType?: LegendType;
    tooltipType?: TooltipType;
    hide?: boolean;
    label?: any;
    onAnimationStart?: () => void;
    onAnimationEnd?: () => void;
    animationBegin?: number;
    animationDuration?: number;
    isAnimationActive?: boolean;
    animationId?: number;
    animationEasing?: AnimationTiming;
    onMouseEnter?: (props: any, e: MouseEvent<SVGPolygonElement>) => void;
    onMouseLeave?: (props: any, e: MouseEvent<SVGPolygonElement>) => void;
}
declare type Props = Omit<PresentationAttributes<SVGElement>, 'onMouseEnter' | 'onMouseLeave'> & RadarProps;
interface State {
    isAnimationFinished?: boolean;
    prevPoints?: RadarPoint[];
}
declare class Radar extends PureComponent<Props, State> {
    static displayName: string;
    static defaultProps: {
        angleAxisId: number;
        radiusAxisId: number;
        hide: boolean;
        activeDot: boolean;
        dot: boolean;
        legendType: string;
        isAnimationActive: boolean;
        animationBegin: number;
        animationDuration: number;
        animationEasing: string;
    };
    static getComposedData: ({ radiusAxis, angleAxis, displayedData, dataKey, bandSize, }: {
        radiusAxis: React.AriaAttributes & React.DOMAttributes<SVGElement> & React.SVGProps<SVGElement> & import("./PolarRadiusAxis").PolarRadiusAxisProps & {
            scale: (value: any) => number;
        };
        angleAxis: React.AriaAttributes & React.DOMAttributes<SVGTextElement> & React.SVGProps<SVGTextElement> & import("./PolarAngleAxis").PolarAngleAxisProps & {
            scale: (value: any) => number;
        };
        displayedData: any[];
        dataKey: DataKey<any>;
        bandSize: number;
    }) => {
        points: {
            name: any;
            value: any;
            cx: number;
            cy: number;
            radius: number;
            angle: number;
            payload: any;
            x: number;
            y: number;
        }[];
    };
    state: State;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    cachePrevData: (points: RadarPoint[]) => void;
    handleAnimationEnd: () => void;
    handleAnimationStart: () => void;
    handleMouseEnter: (e: React.MouseEvent<SVGPolygonElement, globalThis.MouseEvent>) => void;
    handleMouseLeave: (e: React.MouseEvent<SVGPolygonElement, globalThis.MouseEvent>) => void;
    static renderDotItem(option: RadarDot, props: any): SVGElement | JSX.Element;
    renderDots(points: RadarPoint[]): JSX.Element;
    renderPolygonStatically(points: RadarPoint[]): JSX.Element;
    renderPolygonWithAnimation(): JSX.Element;
    renderPolygon(): JSX.Element;
    render(): JSX.Element;
}
export default Radar;
