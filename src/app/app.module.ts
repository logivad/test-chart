import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FormsModule } from '@angular/forms';
import { IconIncreaseComponent } from './bar-chart/icon-increase/icon-increase.component';
import { IconDecreaseComponent } from './bar-chart/icon-decrease/icon-decrease.component';

@NgModule({
    declarations: [AppComponent, BarChartComponent, IconIncreaseComponent, IconDecreaseComponent],
    imports: [BrowserModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
