// validation/courseValidation.js
import * as Yup from 'yup';

export const courseSchema = Yup.object({
    title: Yup.string().required("Le titre est obligatoire."),
    content: Yup.string().required("Le contenu est obligatoire."),
});
