/** DTO? Data Transfer Object= 데이터 전송 객체
 * 사용자와 주고받을 데이터 타입을 정의하는 클래스.
 * */

import {IsString, IsNumber, IsOptional} from 'class-validator'; //클래스 유효성 검사

export class CreateMovieDto{
    @IsString()
    readonly title:string;

    @IsNumber()
    readonly year:number;
    
    @IsOptional() //필수값이 아닌 선택값.
    @IsString({each:true})
    readonly genres:string[];
}