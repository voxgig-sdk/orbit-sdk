import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Webhook, WebhookLoadMatch, WebhookCreateData, WebhookUpdateData, WebhookRemoveMatch } from '../OrbitTypes';
declare class WebhookEntity extends OrbitEntityBase<Webhook> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    load(this: any, reqmatch?: WebhookLoadMatch, ctrl?: Control): Promise<WebhookEntity>;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
    update(this: any, reqdata?: WebhookUpdateData, ctrl?: Control): Promise<WebhookEntity>;
    remove(this: any, reqmatch?: WebhookRemoveMatch, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
