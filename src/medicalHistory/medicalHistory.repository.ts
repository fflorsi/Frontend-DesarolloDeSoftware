import { Repository } from "../shared/repository.js";
import { MedicalHistory } from "./medicalHistory.entity.js";
import { pool } from "../shared/db/conn.js";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { observation } from "../observation/observations.entity.js";


export class MedicalHistoryRepository implements Repository<MedicalHistory>{

  public async findAll(): Promise<MedicalHistory[] | undefined> {
    const [medicalHistories] = await pool.query('select * from medicalhistories')
    for (const medicalHistory of medicalHistories as MedicalHistory[]){
      const [vaccines] = await pool.query('select v.name from medicalhistories_vaccines mhv inner join vaccines v on mhv.vaccineId = v.id where medicalHistoryId = ?',[medicalHistory.id])
      for(const vaccine of vaccines as any[]){
      medicalHistory.vaccines.map(vaccine)}
      const [observations] = await pool.query('select * from observations where medicalHistoryId = ?',[medicalHistory.id])
      medicalHistory.observations = (observations as {id: observation}[]).map((observation)=>observation.id)
      };
    return medicalHistories as MedicalHistory[]
    }

  public async findOne(petId: {id: string }): Promise<MedicalHistory | undefined> {
    const id = Number.parseInt(petId.id)
    const [medicalHistories] = await pool.query<RowDataPacket[]>('select id from medicalhistories where petId = ?', [id])
    if(medicalHistories.length === 0){
      return undefined
    }
    const medicalHistory = medicalHistories[0] as MedicalHistory
    const [vaccines] = await pool.query<RowDataPacket[]>(
        'SELECT v.name FROM medicalhistories_vaccines mhv INNER JOIN vaccines v ON mhv.vaccineId = v.id WHERE medicalHistoryId = ?',
        [medicalHistory.id]
    )
    medicalHistory.vaccines = vaccines.map((vaccine) => vaccine.name);
    const [observations] = await pool.query<RowDataPacket[]>(
        'SELECT observation, datePerformed, name FROM observations WHERE medicalHistoryId = ?',
        [medicalHistory.id])
    medicalHistory.observations = observations.map((observation) => ({
        observation: observation.observation,
        datePerformed: observation.datePerformed,
        name: observation.name
    }));
    return medicalHistory
  }

  public async add(medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const {id, vaccines, ...medicalHistoryRow} = medicalHistoryInput
    const [result] = await pool.query<ResultSetHeader>('insert into medicalHistories set ?', [medicalHistoryRow])
    medicalHistoryInput.id = result.insertId
    for (const vaccine of [vaccines]){
      await pool.query('insert into medicalHistories_vaccines set ?',{medicalHistoryId: medicalHistoryInput.id, vaccineId: vaccine})
    }
    return medicalHistoryInput
  }

  public async update(id: string, medicalHistoryInput: MedicalHistory): Promise<MedicalHistory | undefined> {
    const medicalHistoryId = Number.parseInt(id)
    const {vaccines, ...medicalHistoryRow} = medicalHistoryInput
    await pool.query('update medicalHistories set ? where id = ?',[medicalHistoryRow,medicalHistoryId])
    
    await pool.query('delete from medicalHistories_vaccines where medicalHistoryId = ?', [medicalHistoryId])
  
    if([vaccines]?.length>0){
      for (const vaccineId of [vaccines]){
        await pool.query('insert into medicalHistories_vaccines set ?',{medicalHistoryId,vaccineId})
      }
    }
    return await this.findOne({id})
  }

  public async delete(vaccine: { id: string }): Promise<MedicalHistory | undefined> {
    try{
    const medicalHistoryToDelete = await this.findOne(vaccine)
    const medicalHistoryId = Number.parseInt(vaccine.id)
    await pool.query('delete from medicalHistories_vaccines where medicalHistoryId = ?',medicalHistoryId)
    await pool.query('delete from medicalHistories where id = ?',medicalHistoryId)
    return medicalHistoryToDelete
    } catch(error:any){
      throw new Error('Unable to delete Medical History')
    }
  }

  }
