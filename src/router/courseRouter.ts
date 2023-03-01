import express from "express"
import { CourseController } from "../controller/CourseController"
import { CourseDTO } from "../dtos/CourseDTO"
import { CourseBusiness } from "../business/CourseBusiness"
import { CourseDatabase } from "../database/CourseDatabase"

export const courseRouter = express.Router()

const controller = new CourseController(
    new CourseDTO(),
    new CourseBusiness(new CourseDTO(),new CourseDatabase())
)

courseRouter.get("/", controller.getCourses)
courseRouter.post("/", controller.createCourse)
courseRouter.put("/:id", controller.editCourse)
courseRouter.delete("/:id", controller.deleteCourse)