import { ActivityEntity } from './entity/ActivityEntity';
import { ActivityTypeEntity } from './entity/ActivityTypeEntity';
import { MemberEntity } from './entity/MemberEntity';
import { NoteEntity } from './entity/NoteEntity';
import { OrganizationEntity } from './entity/OrganizationEntity';
import { ReportEntity } from './entity/ReportEntity';
import { UserEntity } from './entity/UserEntity';
import { WebhookEntity } from './entity/WebhookEntity';
import { WorkspaceEntity } from './entity/WorkspaceEntity';
export type * from './OrbitTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OrbitEntityBase } from './OrbitEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OrbitSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Activity(entopts?: Record<string, any>): ActivityEntity;
    ActivityType(entopts?: Record<string, any>): ActivityTypeEntity;
    Member(entopts?: Record<string, any>): MemberEntity;
    Note(entopts?: Record<string, any>): NoteEntity;
    Organization(entopts?: Record<string, any>): OrganizationEntity;
    Report(entopts?: Record<string, any>): ReportEntity;
    User(entopts?: Record<string, any>): UserEntity;
    Webhook(entopts?: Record<string, any>): WebhookEntity;
    Workspace(entopts?: Record<string, any>): WorkspaceEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OrbitSDK;
    tester(testopts?: any, sdkopts?: any): OrbitSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OrbitSDK;
export { stdutil, config, BaseFeature, OrbitEntityBase, OrbitSDK, SDK, };
