import { Model } from "objection";
import User from "./User.model.js";
export default class Course extends Model {
    static get tableName() {
        return "courses";
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["title", "authorId"],
            properties: {
                id: { type: "integer" },
                title: { type: "string", minLength: 1, maxLength: 255 },
                content: { type: "string", minLength: 1 },
                authorId: { type: "integer" },
            },
        };
    }

    static get relationMappings() {
        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: "courses.authorId",
                    to: "users.id",
                },
            },
        };
    }
}
