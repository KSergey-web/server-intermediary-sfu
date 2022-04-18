import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Query, ParseIntPipe } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { EquipmentFileDto } from './dto/equipment-file.dto';
import { EquipmentCommandDto } from './dto/equipment-command.dto';


@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) { }

  @Get(':id/send-command')
  redirectCommand(@Param('id', ParseIntPipe) id: number, @Query() dto: EquipmentCommandDto) {
    return this.equipmentService.sendCommand(dto.server_url, dto.command);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: EquipmentFileDto,
  })
  uploadFile(@UploadedFile() file) { }
}
