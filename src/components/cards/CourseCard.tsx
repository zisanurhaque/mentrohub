import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image, { StaticImageData } from "next/image";
import { Star, BadgeCheck } from "lucide-react";

interface PropsType {
  data: {
    title: string;
    instructor: string;
    rating: number;
    reviewsCount: number;
    offerPrice: number;
    currentPrice: number;
    label: string;
    category: string;
    thumbnail: StaticImageData;
  };
}

const CourseCard = ({ data }: PropsType) => {
  return (
    <Card className="p-0 overflow-hidden gap-0">
      <CardHeader className="p-0">
        <div className="w-full h-[170px] relative">
          <Image
            src={data.thumbnail}
            alt="react"
            className="w-full h-full object-cover"
            fill
          />
        </div>
      </CardHeader>
      <CardContent className="p-2 pb-4 px-3">
        <CardTitle className="font-bold">{data.title}</CardTitle>
        <CardDescription className="text-xs mt-1 font-semibold">
          {data.instructor}
        </CardDescription>
        <div className="flex items-center my-1 space-x-1">
          <p className="text-xs font-bold text-primary">{data.rating}</p>
          <div className="flex items-center">
            <Star size={13} className="fill-primary stroke-primary" />
            <Star size={13} className="fill-primary stroke-primary" />
            <Star size={13} className="fill-primary stroke-primary" />
            <Star size={13} className="fill-primary stroke-primary" />{" "}
            <Star size={13} className="stroke-primary" />
          </div>
          <CardDescription className="text-xs">
            ({data.reviewsCount})
          </CardDescription>
        </div>

        <div className="flex items-center space-x-1 w-full mt-1">
          <CardTitle className="font-bold">${data.currentPrice}</CardTitle>
          <CardDescription className="text-sm">
            <del>${data.offerPrice}</del>
          </CardDescription>
        </div>
        <p className="bg-primary w-max px-2 py-[2px] text-background text-[10px] font-semibold rounded mt-2 flex items-center pr-3">
          <BadgeCheck size={12} className="mr-1" />
          {data.label}
        </p>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
