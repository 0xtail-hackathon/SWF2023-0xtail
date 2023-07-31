import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { CommonResponse } from './api-dto';

export const ApiPaginatedDto = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiExtraModels(CommonResponse, model),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommonResponse) },
          {
            properties: {
              result: {
                type: 'boolean',
              },
              data: {
                properties: {
                  count: {
                    type: 'number',
                  },
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
      },
    }),
  );
};

export class PaginationDto<T> {
  @ApiProperty()
  @IsNumber()
  count: number;

  page?: number;
  rpp?: number;
  path?: string;
  items: T[];
}
