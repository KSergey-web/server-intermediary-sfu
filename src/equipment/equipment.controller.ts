import {
  Controller,
  Get,
  UseInterceptors,
  UploadedFile,
  Query,
  Post,
  Param,
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { EquipmentFileDto } from './dto/equipment-file.dto';
import { EquipmentCommandDto } from './dto/equipment-command.dto';
import { EquipmentGateway } from './equipment.gateway';
import { ILabServerOutput } from './interfaces/lab-server-output.interface';

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(
    private readonly equipmentService: EquipmentService,
    private readonly equipmentGateway: EquipmentGateway,
  ) {}

  @ApiBearerAuth()
  @Get('send-command/session/:sessionId')
  @ApiParam({ name: 'sessionId' })
  async redirectCommand(
    @Query() dto: EquipmentCommandDto,
    @Param('sessionId') sessionId: string,
  ): Promise<ILabServerOutput> {
    const url = dto.equipment.server_url + '/' + dto.equipment.type;
    const output: ILabServerOutput = await this.equipmentService.sendCommand(
      url,
      dto.command,
      dto.equipment,
    );
    this.equipmentGateway.sendOutputToUsers(sessionId, output);
    return output;
  }

  @ApiBearerAuth()
  @Get('check-availability-server/session/:sessionId')
  @ApiParam({ name: 'sessionId' })
  async checkAvailabilityEquipmentServer(
    @Query() dto: EquipmentCommandDto,
  ): Promise<any> {
    const output: any = await this.equipmentService.sendCommand(
      dto.equipment.server_url,
      '/',
      dto.equipment,
    );
    return output;
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @Post('send-file/session/:sessionId')
  @ApiBody({
    description: 'List of cats',
    type: EquipmentFileDto,
  })
  @ApiParam({ name: 'sessionId' })
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query() dto: EquipmentCommandDto,
    @Param('sessionId') sessionId: string,
  ): Promise<ILabServerOutput> {
    const url = dto.equipment.server_url + '/' + dto.equipment.type;
    const output: ILabServerOutput = await this.equipmentService.sendFile(
      url,
      dto.command,
      file,
      dto.equipment,
    );
    this.equipmentGateway.sendOutputToUsers(sessionId, output);
    return output;
  }
}
