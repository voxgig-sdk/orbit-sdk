import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { User, UserLoadMatch } from '../OrbitTypes';
declare class UserEntity extends OrbitEntityBase<User> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    load(this: any, reqmatch?: UserLoadMatch, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
