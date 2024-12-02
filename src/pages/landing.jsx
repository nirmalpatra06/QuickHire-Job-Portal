import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faqs.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandingPage = () => {
  return (
    <main className="flex flex-col gap-6 sm:gap-3 py-28 sm:py-36 w-full">
      <section className="pt-14 sm:pt-0">
        <h1 className="flex flex-col gap-4 items-center justify-center">
          <span className="text-3xl  text-center sm:text-6xl lg:text-8xl font-extrabold">
            Connecting Talent with Opportunity
          </span>
          <span className="text-sm sm:text-2xl lg:text-3xl text-gray-300">
            Your Dream Job Starts Here...
          </span>
        </h1>
        <p className="text-gray-400 mt-4 text-center text-xs sm:text-xl">
          Explore thousands of job listing
          <span className="text-red-400"> or </span>find the perfect candidate
        </p>
      </section>
      <div className="flex gap-4 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          <Button size="xl" variant="blue">
            Find Job
          </Button>
        </Link>
        <Link to="/postjob">
          <Button size="xl" variant="destructive">
            Post a Job
          </Button>
        </Link>
      </div>
      {/* carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-8 -z-10"
      >
        <CarouselContent className="flex items-center gap-5 sm:gap-20">
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  className="h-9 sm:h-14 object-contain"
                  src={path}
                  alt={name}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="bannerImg.jpeg" alt="Banner" className="px-4" />
      {/* cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mt-10">
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applictions and find the best candidates.
          </CardContent>
        </Card>
      </section>
      {/* accordian */}
      <section className="px-4 mt-10">
        <Accordion type="single" collapsible>
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};
export default LandingPage;
