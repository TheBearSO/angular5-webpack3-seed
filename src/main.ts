import './vendor.ts';
import './vendor.less';

import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

let platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);