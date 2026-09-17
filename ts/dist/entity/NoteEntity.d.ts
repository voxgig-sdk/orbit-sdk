import { OrbitEntityBase } from '../OrbitEntityBase';
import type { OrbitSDK } from '../OrbitSDK';
import type { Control } from '../types';
import type { Note, NoteLoadMatch, NoteCreateData, NoteUpdateData } from '../OrbitTypes';
declare class NoteEntity extends OrbitEntityBase<Note> {
    constructor(client: OrbitSDK, entopts: any);
    make(this: NoteEntity): NoteEntity;
    load(this: any, reqmatch?: NoteLoadMatch, ctrl?: Control): Promise<NoteEntity>;
    create(this: any, reqdata?: NoteCreateData, ctrl?: Control): Promise<NoteEntity>;
    update(this: any, reqdata?: NoteUpdateData, ctrl?: Control): Promise<NoteEntity>;
}
export { NoteEntity };
