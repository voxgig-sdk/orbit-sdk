import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Report, ReportLoadMatch } from '../OrbitTypes';
declare class ReportEntity extends OrbitEntityBase<Report> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: ReportEntity): ReportEntity;
    load(this: any, reqmatch?: ReportLoadMatch, ctrl?: Control): Promise<ReportEntity>;
}
export { ReportEntity };
