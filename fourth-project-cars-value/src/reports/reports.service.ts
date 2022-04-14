import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { CreateReportDTO } from './dtos/create-report.dto';
import { Report } from './report.entity';
import { GetEstimateDTO } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  create(reportDTO: CreateReportDTO, user: User) {
    const report = this.repo.create(reportDTO);
    report.user = user;
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id);
    if (!report) throw new NotFoundException('report not found');
    report.approved = approved;
    return this.repo.save(report);
  }

  createEstimate(estimateDTO: GetEstimateDTO) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price ')
      .where('manufacturer=:manufacturer', {
        manufacturer: estimateDTO.manufacturer,
      })
      .andWhere('approved IS TRUE')
      .andWhere('model = :model', { model: estimateDTO.model })
      .andWhere('lng -  :lng BETWEEN -5 AND 5', { lng: estimateDTO.lng })
      .andWhere('lat -  :lat BETWEEN -5 AND 5', { lat: estimateDTO.lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year: estimateDTO.year })
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage: estimateDTO.mileage })
      .limit(3)
      .getRawOne();
  }
}

