import { Request, Response, Router } from 'express';
import { studentRepository } from '../repositories/StudentRepository';
import { body, validationResult } from 'express-validator';

const studentRouter = Router();

const validate = [
    body('name').isString().withMessage('Esse campo deve ser um texto').notEmpty().withMessage('Esse campo não pode ser vazio'),
    body('age').isNumeric().withMessage('Esse campo deve ser um número').isInt({ min: 0 }).withMessage('A idade deve ser um número inteiro não negativo').notEmpty().withMessage('Esse campo não pode ser vazio'),
    body('firstScore').isNumeric().withMessage('Esse campo deve ser um número').isInt({ min: 0 }).withMessage('A primeira nota deve ser um número inteiro não negativo').notEmpty().withMessage('Esse campo não pode ser vazio'),
    body('secondScore').isNumeric().withMessage('Esse campo deve ser um número').isInt({ min: 0 }).withMessage('A segunda nota deve ser um número inteiro não negativo').notEmpty().withMessage('Esse campo não pode ser vazio'),
    body('teacher').isString().withMessage('Esse campo deve ser um texto').notEmpty().withMessage('Esse campo não pode ser vazio'),
    body('studentClass').isNumeric().withMessage('Esse campo deve ser um número').isInt({ min: 0 }).withMessage('A classe deve ser um número inteiro não negativo').notEmpty().withMessage('Esse campo não pode ser vazio')
]

studentRouter.get('/', (req: Request, res: Response) => {
    res.json('Hello world')
}) 

//create
studentRouter.post('/create', validate, async (req: Request, res: Response) => {
        try {
            const { name, age, firstScore, secondScore, teacher, studentClass } = req.body;
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() })
            }

            const newStudent = ({
                name,
                age,
                firstScore,
                secondScore,
                teacher,
                studentClass,
            });

            const savedStudent = await studentRepository.save(newStudent);

            res.status(201).json(savedStudent);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })

//read
studentRouter.get('/all', async (_req: Request, res: Response) => {
    try {
        const students = await studentRepository.find();
        return res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//get by id
studentRouter.get('/getOne/:id' ,async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingStudent = await studentRepository.findOneBy({ id: Number(id) });
        if (!existingStudent) {
            return res.status(204).json({ message: 'Estudante não encontrado' });
        }
        return res.status(200).json(existingStudent);
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//update
studentRouter.put('/update/:id', validate, async (req: Request, res: Response): Promise<Response> => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() })
        }
        const { id } = req.params;
        const { name, age, firstScore, secondScore, teacher, studentClass } = req.body;

        const existingStudent = await studentRepository.findOneBy({ id: Number(id) });

        if (!existingStudent) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }

        existingStudent.name = name;
        existingStudent.age = age;
        existingStudent.firstScore = firstScore;
        existingStudent.secondScore = secondScore;
        existingStudent.teacher = teacher;
        existingStudent.studentClass = studentClass;

        const updatedStudent = await studentRepository.save(existingStudent);

        return res.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao atualizar estudante' });
    }
});

//delete
studentRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const existingStudent = await studentRepository.findOneBy({ id: Number(id) });
        if (!existingStudent) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }

        await studentRepository.delete(existingStudent);
        return res.status(200).json('Dados do estudante deletado');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao deletar estudante' });
    }
})

export default studentRouter;
