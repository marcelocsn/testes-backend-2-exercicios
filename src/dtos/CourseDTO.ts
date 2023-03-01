import { BadRequestError } from "../errors/BadRequestError"
import { CourseOutputDTO, CreateCourseInputDTO, EditCourseInputDTO } from "../interfaces/types"
import { Course } from "../models/Course"

export class CourseDTO {
  // metodo de requisição - dado de entrada = input
  createCourseInput = (id: unknown,name: unknown,lessons: unknown): CreateCourseInputDTO => {
    if (typeof id !== "string") {
      throw new BadRequestError("'id' deve ser string")
    }

    if (typeof name !== "string") {
      throw new BadRequestError("'name' deve ser string")
    }

    if (typeof lessons !== "number") {
      throw new BadRequestError("'lessons' deve ser number")
    }

    const result: CreateCourseInputDTO = {
      id,
      name,
      lessons,
    }

    return result
  }

  // metodo de resposta = output
  createCourseOutput = (parameter: Course): CourseOutputDTO => {
    const result: CourseOutputDTO = {
      message: "Produto registrado com sucesso",
      course: {
        id: parameter.getId(),
        name: parameter.getName(),
        lessons: parameter.getLessons()
      },
    }

    return result
  }

  editCourseInput = (idToEdit: string,newId: unknown,newName: unknown, newLessons: unknown): EditCourseInputDTO => {
    if (newId !== undefined) {
      if (typeof newId !== "string") {
        throw new BadRequestError("'id' deve ser string")
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        throw new BadRequestError("'name' deve ser string")
      }
    }

    if (newLessons !== undefined) {
      if (typeof newLessons !== "number") {
        throw new BadRequestError("'lessons' deve ser number")
      }
    }

    const result: EditCourseInputDTO = {
      idToEdit,
      newId,
      newName,
      newLessons
    }
    return result
  }

  editCourseOutput = (parameter: Course): CourseOutputDTO => {
    const result: CourseOutputDTO = {
      message: "Curso atualizado com sucesso",
      course: {
        id: parameter.getId(),
        name: parameter.getName(),
        lessons: parameter.getLessons()
      },
    }
    return result
  }
}
