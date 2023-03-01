import { Request, Response } from "express"
import { BaseError } from "../errors/BaseError"
import { CourseDTO } from "../dtos/CourseDTO"
import { CourseBusiness } from "../business/CourseBusiness"

export class CourseController {
    constructor(
        private dto: CourseDTO,
        private business: CourseBusiness
    ) {}

    getCourses = async (req: Request, res: Response) => {
        try {
            const input = {
                q: req.query.q
            }
            const output = await this.business.getCourses(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    createCourse = async (req: Request, res: Response) => {
        try {

            const input = this.dto.createCourseInput(
                req.body.id,
                req.body.name,
                req.body.lessons
            )

            const output = await this.business.createCourse(input)

            res.status(201).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    editCourse = async (req: Request, res: Response) => {
        try {

            const input = this.dto.editCourseInput(
                req.params.id,
                req.body.id,
                req.body.name,
                req.body.lessons
            )

            const output = await this.business.editCourse(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }

    deleteCourse = async (req: Request, res: Response) => {
        try {

            const input = {
                idToDelete: req.params.id
            }

            const output = await this.business.deleteCourse(input)

            res.status(200).send(output)
        } catch (error) {
            console.log(error)

            if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send("Erro inesperado")
            }
        }
    }
}