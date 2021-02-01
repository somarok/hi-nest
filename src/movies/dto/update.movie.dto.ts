/** DTO? Data Transfer Object= 데이터 전송 객체
 * 사용자와 주고받을 데이터 타입을 정의하는 클래스.
 * */

import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';

export class UpdateMovieDto extends PartialType(CreateMovieDto){
     
}