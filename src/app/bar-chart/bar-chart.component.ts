import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

export interface BarChartItem {
    x: number;
    y: number;
    preferDecrease?: boolean;
}

interface DataItem {
    yesterday: number;
    today: number;
    todayK: number;
    percent: number;
    good: boolean;
    bad: boolean;
}

export const defaultCanvasHeight = 300;

@Component({
    selector: 'app-bar-chart',
    templateUrl: './bar-chart.component.html',
    styleUrls: ['./bar-chart.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent implements OnChanges {
    @Input() public items: Array<BarChartItem>;
    @Input() public canvasHeight = defaultCanvasHeight;
    @Input() public linear = false;

    public data: Array<DataItem> = [];
    public valuePixelRatio = 0;

    public ngOnChanges(changes: SimpleChanges) {
        this.createData();
    }

    private createData() {
        let maxValue = 0;
        this.data = [];

        this.items.forEach(item => {
            this.data.push({
                yesterday: item.x,
                today: item.y,
                todayK: Math.round(item.y / 1000),
                percent: Math.round(100 * (item.y / item.x - 1)),
                good: (item.y > item.x && !item.preferDecrease) || (item.y < item.x && item.preferDecrease),
                bad: (item.y < item.x && !item.preferDecrease) || (item.y > item.x && item.preferDecrease),
            });

            maxValue = Math.max(maxValue, item.x, item.y);
        });

        const height = this.canvasHeight || defaultCanvasHeight;
        this.valuePixelRatio = this.linear ? height / maxValue : height / Math.log10(maxValue);
    }

    public getHeight(value) {
        return this.linear ? value * this.valuePixelRatio : Math.log10(value) * this.valuePixelRatio;
    }

    public trackByIndex(i) {
        return i;
    }
}
