import React from 'react';
import { Card, CardBody, CardFooter } from '@nextui-org/react';
import Converter from '@/utils/Converter';
import Button from '../Button';
import Image from 'next/image';
import Link from 'next/link';

const CardProduct = ({ title, datas, setDetailProduct }: any) => {
  return (
    <div className="flex flex-col justify-center lg:px-10 md:px-10 sm:px-3 px-3 gap-3">
      <h1 className="lg:text-2xl md:text-2xl sm:text-xl text-xl text-color-pink font-semibold">{title}</h1>
      <div className="lg:gap-4 md:gap-4 sm:gap-3 gap-3 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 ">
        {datas.map((data: any, index: number) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => console.log('item pressed')}
          >
            <Link
              href={`/product/${data.id}`}
              className="w-full"
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
            </Link>

            <CardFooter className="text-small flex lg:flex-row md:flex-row sm:flex-col flex-col justify-between lg:items-center md:items-centersm:items-start items-start gap-2">
              <div className="flex flex-col justify-center items-start">
                <b className="text-color-pink text-start">{data.name}</b>
                <p className="text-default-500">{Converter(data.price)}</p>
              </div>
              <Button
                label="View detail"
                type="button"
                className="bg-color-red text-color-primary py-2 px-3 rounded-md font-semibold w-[100px] opacity-70 hover:opacity-90 text-sm"
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
