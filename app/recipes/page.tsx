import { FC } from "react";
import { RecipeCard } from "../page2";
import contentfulService from "@/lib/contentfulClient";
import { SearchParams } from "@/app/blog/page";

const AllRecipesPage: FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const recipes = await contentfulService.getAllRecipes();

  return (
    <main>
      <div className="section-description">
        <h1>All Recipes</h1>
        <p>The complete collection — every recipe we have ever baked up!</p>
      </div>
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

export default AllRecipesPage;
