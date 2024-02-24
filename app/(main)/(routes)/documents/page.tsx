"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InfiniteMovingCards } from "@/components/ui/moving-cards";

const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();

  const create = useMutation(api.documents.create);
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse nec odio ut justo facilisis consectetur.",
      name: "John Doe",
      title: "CEO",
    },
    {
      quote:
        "Vivamus auctor justo vel arcu malesuada, in semper mauris consequat. Duis vestibulum commodo urna, ac lacinia odio scelerisque non.",
      name: "Jane Smith",
      title: "CTO",
    },
    {
      quote:
        "Fusce auctor libero eu ante tincidunt, at tristique justo blandit. Quisque scelerisque, neque sit amet posuere vestibulum.",
      name: "Mike Johnson",
      title: "COO",
    },
    {
      quote:
        "Proin non dui nec metus auctor tincidunt. Nullam ultricies efficitur lectus, in tincidunt justo fermentum in.",
      name: "Emily Brown",
      title: "CFO",
    },
    {
      quote:
        "Integer id justo eu risus vehicula bibendum. Nunc congue, libero ut lacinia fermentum, erat dolor eleifend tellus, id tempus arcu libero id urna.",
      name: "Chris Anderson",
      title: "Marketing Director",
    },
    {
      quote:
        "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed non leo a neque suscipit rhoncus.",
      name: "Laura Davis",
      title: "Product Manager",
    },
    {
      quote:
        "Curabitur vel sem a leo accumsan fermentum. Nulla facilisi. Sed vel turpis non urna fermentum auctor ac ut justo.",
      name: "Alex Turner",
      title: "Software Engineer",
    },
    {
      quote:
        "Etiam bibendum metus in tortor tincidunt, vel efficitur nulla scelerisque. In hac habitasse platea dictumst.",
      name: "Sophia Rogers",
      title: "UX Designer",
    },
    {
      quote:
        "Maecenas eget turpis eu urna bibendum venenatis vitae eu risus. Vivamus vel justo a dui efficitur tincidunt.",
      name: "Daniel White",
      title: "Sales Manager",
    },
    {
      quote:
        "Duis euismod elit a arcu feugiat vestibulum. Morbi vel libero ac metus bibendum sollicitudin.",
      name: "Emma Taylor",
      title: "Customer Support Specialist",
    },
  ];

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentID) =>
      router.push(`/documents/${documentID}`)
    );
    toast.promise(promise, {
      loading: "Creating a new article",
      success: "New article created",
      error: "Failed to create article",
    });
  };
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden space-y-6">
        <InfiniteMovingCards
          items={testimonials}
          direction="left"
          speed="slow"
        />

        <h2 className="text-lg font-medium">Welcome to Articuate</h2>
        <Button onClick={onCreate}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create a article
        </Button>
      </div>
    </div>
  );
};

export default DocumentsPage;
