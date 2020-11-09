import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

export interface BarChartItem {
    x: number;
    y: number;
    title: string;
    preferDecrease?: boolean;
}

export const defaultCanvasHeight = 300;

enum Scale {
    linear = 'linear',
    log = 'log',
}

const linesNumber = 5;

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnChanges {
    @Input() public items: Array<BarChartItem> = [];
    @Input() public canvasHeight = defaultCanvasHeight;

    public valuePixelRatio = 0;
    public maxValue = 0;
    public lineValues: Array<number> = [];
    public scale: Scale = Scale.log;
    public scaleTypes = Scale;

    public ngOnChanges(changes: SimpleChanges) {
        this.maxValue = this.items.reduce((max, item) => Math.max(max, item.x, item.y), 0);
        this.valuePixelRatio = this.getValuePixelRatio();
        this.lineValues = this.getLineValues(this.maxValue, this.scale);
    }

    public scaleChangeHandler(scale): void {
        this.valuePixelRatio = this.getValuePixelRatio();
        this.lineValues = this.getLineValues(this.maxValue, this.scale);
    }

    private getLineValues(max: number, scale: Scale) {
        return Array(6).fill(null)
            .map((el, i) => i * this.canvasHeight / 5)
            .map(height => Math.round(this.getValueByHeight(height) / 1000));
    }

    private getValuePixelRatio(): number {
        if (this.scale === Scale.linear) {
            return this.canvasHeight / this.maxValue;
        }

        if (this.scale === Scale.log) {
            return this.canvasHeight / Math.log10(this.maxValue);
        }

        throw new Error('Cannot calculate value pixel ratio');
    }

    public getValueByHeight(height): number {
        if (this.scale === Scale.linear) {
            return height / this.valuePixelRatio;
        }

        if (this.scale === Scale.log) {
            return Math.pow(10, height / this.valuePixelRatio);
        }

        throw new Error('Cannot calculate value');
    }

    public getHeightByValue(value): number {
        if (this.scale === Scale.linear) {
            return value * this.valuePixelRatio;
        }

        if (this.scale === Scale.log) {
            return Math.log10(value) * this.valuePixelRatio;
        }

        throw new Error('Cannot calculate height');
    }

    public isGood(item: BarChartItem): boolean {
        return (
            (item.y > item.x && !item.preferDecrease) ||
            (item.y < item.x && item.preferDecrease)
        );
    }

    public isBad(item: BarChartItem): boolean {
        return (
            (item.y < item.x && !item.preferDecrease) ||
            (item.y > item.x && item.preferDecrease)
        );
    }

    public getTotal(item: BarChartItem): number {
        return Math.round(item.y / 1000);
    }

    public getPercent(item: BarChartItem): string {
        if (item.x === item.y) {
            return '0%';
        }

        if (item.x === 0 || item.y === 0) {
            return '';
        }

        const percent = Math.round(100 * (item.y / item.x - 1));

        return `${percent > 0 ? '+' : ''}${percent}%`;
    }

    public isIncreasing(item: BarChartItem): boolean {
        return item.y > item.x;
    }

    public isDecreasing(item: BarChartItem): boolean {
        return item.y < item.x;
    }

    public trackByIndex(i) {
        return i;
    }
}
