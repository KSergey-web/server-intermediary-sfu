import {
  Controller,
  Get,
  UseInterceptors,
  UploadedFile,
  Query,
  Post,
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

@ApiTags('equipment')
@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @ApiBearerAuth()
  @Get('send-command/session/:sessionId')
  @ApiParam({ name: 'sessionId' })
  async redirectCommand(@Query() dto: EquipmentCommandDto) {
    return await this.equipmentService.sendCommand(dto.server_url, dto.command);
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
  ) {
    await this.equipmentService.sendFile(dto.server_url, dto.command, file);
  }
}
