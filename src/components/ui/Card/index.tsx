import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Converter from '@/utils/Converter';
import Button from '../Button';
import Image from 'next/image';

const CardProduct = ({ title, datas, setDetailProduct }: any) => {
  return (
    <div className="flex flex-col justify-center lg:px-10 md:px-10 sm:px-5 px-5 gap-3">
      <h1 className="text-3xl text-color-pink font-semibold">{title}</h1>
      <div className="lg:gap-4 md:gap-4 sm:gap-2 gap-2 grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 ">
        {datas.map((data: any, index: number) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log('item pressed')}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                width={200}
                height={200}
                alt={data.name}
                className="w-full object-cover h-[230px] shadow-md rounded-md"
                src={data.image}
              />
            </CardBody>

            <CardFooter className="text-small justify-between ">
              <div className="flex flex-col justify-center items-start">
                <b className="text-color-pink">{data.name}</b>
                <p className="text-default-500">{Converter(data.price)}</p>
              </div>
              <Button
                label="View detail"
                type="button"
                className="bg-color-red text-color-primary py-2 px-3 rounded-md font-semibold w-[100px] opacity-70 hover:opacity-90"
                onClick={() => setDetailProduct(data)}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CardProduct;
