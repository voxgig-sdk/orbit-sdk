import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Member, MemberLoadMatch, MemberListMatch, MemberCreateData, MemberUpdateData, MemberRemoveMatch } from '../OrbitTypes';
declare class MemberEntity extends OrbitEntityBase<Member> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: MemberEntity): MemberEntity;
    load(this: any, reqmatch?: MemberLoadMatch, ctrl?: Control): Promise<MemberEntity>;
    list(this: any, reqmatch?: MemberListMatch, ctrl?: Control): Promise<MemberEntity[]>;
    create(this: any, reqdata?: MemberCreateData, ctrl?: Control): Promise<MemberEntity>;
    update(this: any, reqdata?: MemberUpdateData, ctrl?: Control): Promise<MemberEntity>;
    remove(this: any, reqmatch?: MemberRemoveMatch, ctrl?: Control): Promise<MemberEntity>;
}
export { MemberEntity };
