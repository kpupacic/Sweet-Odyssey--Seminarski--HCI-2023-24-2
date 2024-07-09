import { GetServerSideProps } from 'next';
import Link from "next/link";
import { FC } from "react";
import { TypeRecipeListItem } from "./(contentful)/types/TypeRecipe";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import contentfulService from "@/lib/contentfulClient";

const RecipeCard: FC<TypeRecipeListItem> = ({
  id,
  name,
  image
}) => (
  <Card className="card">
    <CardContent className="flex flex-col items-center gap-2">
      <CardTitle>{name}</CardTitle>
      <Link href={`/cms/recipes/${id}`}>
        <div className="relative" style={{ width: "280px", height: "280px" }}>
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt={name}
          />
        </div>
      </Link>
    </CardContent>
  </Card>
);

const CmsPage: FC<{ recipes: TypeRecipeListItem[] }> = ({ recipes }) => {
  return (
    <main>
      <ul className="cards gap-5">
        {recipes.sort((a, b) => a.name.localeCompare(b.name)).map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
};

const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await contentfulService.getAllRecipes();
  return {
    props: {
      recipes,
    },
  };
};

export { getServerSideProps };

export default CmsPage;
export { RecipeCard };