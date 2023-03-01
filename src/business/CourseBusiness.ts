import { CourseDatabase } from "../database/CourseDatabase"
import { CourseDTO } from "../dtos/CourseDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CourseDB, CreateCourseInputDTO } from "../interfaces/types"
import { Course } from "../models/Course"

export class CourseBusiness {
  constructor(
    private dto: CourseDTO,
    private database: CourseDatabase
  ) {}
    public getCourses = async (input: any) => {
        const { q } = input

        const coursesDB = await this.database.findCourses(q)

        const courses: Course[] = coursesDB.map(element => new Course(
            element.id,
            element.name,
            element.lessons,
        ))

        return courses
    }

    public createCourse = async (input: CreateCourseInputDTO) => {
        const { id, name, lessons } = input

        if (name.length < 2) {
            throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
        }

        if (lessons <= 0) {
            throw new BadRequestError("'lessons' não pode ser zero ou negativo")
        }

        const courseDBExists = await this.database.findCourseById(id)

        if (courseDBExists) {
            throw new BadRequestError("'id' já existe")
        }

        const newCourse = new Course(
            id,
            name,
            lessons
        )

        const newCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await this.database.insertCourse(newCourseDB)

        const output = this.dto.createCourseOutput(newCourse)

        return output
    }

    public editCourse = async (input: any) => {
        const {
            idToEdit,
            newId,
            newName,
            newLessons
        } = input

        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new BadRequestError("'id' deve ser string")
            }
        }

        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new BadRequestError("'name' deve ser string")
            }

            if (newName.length < 2) {
                throw new BadRequestError("'name' deve possuir pelo menos 2 caracteres")
            }
        }

        if (newLessons !== undefined) {
            if (typeof newLessons !== "number") {
                throw new BadRequestError("'lessons' deve ser number")
            }

            if (newLessons <= 0) {
                throw new BadRequestError("'lessons' não pode ser zero ou negativo")
            }
        }

        const courseToEditDB = await this.database.findCourseById(idToEdit)

        if (!courseToEditDB) {
            throw new NotFoundError("'id' para editar não existe")
        }

        const newCourse = new Course(
            courseToEditDB.id,
            courseToEditDB.name,
            courseToEditDB.lessons
        )

        newId && newCourse.setId(newId)
        newName && newCourse.setName(newName)
        newLessons && newCourse.setLessons(newLessons)

        const updatedCourseDB: CourseDB = {
            id: newCourse.getId(),
            name: newCourse.getName(),
            lessons: newCourse.getLessons()
        }

        await this.database.updateCourse(updatedCourseDB)

        const output = this.dto.editCourseOutput(newCourse)

        return output
    }

    public deleteCourse = async (input: any) => {
        const { idToDelete } = input

        const productToDeleteDB = await this.database.findCourseById(idToDelete)

        if (!productToDeleteDB) {
            throw new NotFoundError("'id' para deletar não existe")
        }

        await this.database.deleteCourseById(productToDeleteDB.id)

        const output = {
            message: "Produto deletado com sucesso"
        }

        return output
    }
}