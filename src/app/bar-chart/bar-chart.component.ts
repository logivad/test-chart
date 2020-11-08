import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';

export interface BarChartItem {
    x: number;
    y: number;
    preferDecrease?: boolean;
}

export const defaultCanvasHeight = 300;

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnChanges {
    @Input() public items: Array<BarChartItem> = [];
    @Input() public canvasHeight = defaultCanvasHeight;
    @Input() public linear = false;

    public valuePixelRatio = 0;
    public maxValue = 0;
    public lines = [0, 50, 100, 150, 200, 250];

    public ngOnChanges(changes: SimpleChanges) {
        this.maxValue = this.items.reduce((max, item) => Math.max(max, item.x, item.y),0);
        this.valuePixelRatio = this.linear
            ? this.canvasHeight / this.maxValue
            : this.canvasHeight / Math.log10(this.maxValue);
    }

    public getHeight(value) {
        return this.linear
            ? value * this.valuePixelRatio
            : Math.log10(value) * this.valuePixelRatio;
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
        console.log(`[getPercent] item.y=${item.y}, item.x=${item.x} percent=${percent}`);

        return `${percent > 0 ? '+' : ''}${percent}%`;
    }

    public trackByIndex(i) {
        return i;
    }
}
