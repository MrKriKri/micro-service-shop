import {BaseSchema} from "@app/common/baseMongo/base.schema";
import {FilterQuery, Model, Types, UpdateQuery} from "mongoose";
import {NotFoundException} from "@nestjs/common";

export abstract class BaseRepository<Document extends BaseSchema>{
  protected constructor(
      private readonly model: Model<Document>,
  ) {}

  async create(payload: Omit<Document, '_id'|'createdAt'|'updatedAt'>){
    const create = new this.model({...payload, createdAt: new Date(), updatedAt: null, _id: new Types.ObjectId()})
    return (await create.save({})).toJSON()
  }

  async findAndUpdateOne(filter: FilterQuery<Document>, payload: UpdateQuery<Document>){
    const doc = await this.model.findOneAndUpdate(filter, {...payload, updatedAt: new Date()}, {new: true})
    if(!doc) throw new NotFoundException(`Not Found ${Model.collection.name}`)
    return doc
  }

  async find(filter: FilterQuery<Document>){
    return (await this.model.find(filter))
  }
}
