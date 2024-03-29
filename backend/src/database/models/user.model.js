import {Model} from "objection";
import Course from "./course.model.js";

export default class User extends Model {
    static get tableName() {
        return "users";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["email", "password"],
            properties: {
                id: {type: "integer"},
                name: {type: "string", minLength: 1, maxLength: 255},
                email: {type: "string", minLength: 1, maxLength: 255},
                password: {type: "string", minLength: 1, maxLength: 255},
                preference: {type: "string", minLength: 1, maxLength: 255},
            },
        };
    }
    static get relationMappings() {
        return {
            courses: {
                relation: Model.HasManyRelation,
                modelClass: Course,
                join: {
                    from: "users.id",
                    to: "courses.authorId",
                },
            },
        };
    }
}

