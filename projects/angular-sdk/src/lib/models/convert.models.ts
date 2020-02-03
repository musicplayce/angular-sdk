import { Tag } from './tag.response.model'
import { Role } from './role.response.model'
import { Picture } from './picture.response.model'
import { Profile } from './profile.response.model'
import { Meta } from './meta.response.model'
import { Media } from './media.response.model'
import { Post } from './post.response.model'
import { Privileges } from './privilege.response.model'

// To parse this data:
//
//   import { Convert, Tag, Privileges, Role, Picture, Profile, Meta, Media, Post } from "./file";
//
//   const tag = Convert.toTag(json);
//   const privileges = Convert.toPrivileges(json);
//   const role = Convert.toRole(json);
//   const picture = Convert.toPicture(json);
//   const profile = Convert.toProfile(json);
//   const meta = Convert.toMeta(json);
//   const media = Convert.toMedia(json);
//   const post = Convert.toPost(json);

// Converts JSON strings to/from your types
export class Convert {
    public static toTag(json: string): Tag {
        return JSON.parse(json)
    }

    public static tagToJson(value: Tag): string {
        return JSON.stringify(value)
    }

    public static toPrivileges(json: string): Privileges {
        return JSON.parse(json)
    }

    public static privilegesToJson(value: Privileges): string {
        return JSON.stringify(value)
    }

    public static toRole(json: string): Role {
        return JSON.parse(json)
    }

    public static roleToJson(value: Role): string {
        return JSON.stringify(value)
    }

    public static toPicture(json: string): Picture {
        return JSON.parse(json)
    }

    public static pictureToJson(value: Picture): string {
        return JSON.stringify(value)
    }

    public static toProfile(json: string): Profile {
        return JSON.parse(json)
    }

    public static profileToJson(value: Profile): string {
        return JSON.stringify(value)
    }

    public static toMeta(json: string): Meta {
        return JSON.parse(json)
    }

    public static metaToJson(value: Meta): string {
        return JSON.stringify(value)
    }

    public static toMedia(json: string): Media {
        return JSON.parse(json)
    }

    public static mediaToJson(value: Media): string {
        return JSON.stringify(value)
    }

    public static toPost(json: string): Post {
        return JSON.parse(json)
    }

    public static postToJson(value: Post): string {
        return JSON.stringify(value)
    }
}
