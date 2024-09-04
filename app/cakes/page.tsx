import { FC } from "react";
import { RecipeCard } from "../page2";
import contentfulService from "@/lib/contentfulClient";
import { SearchParams } from "@/app/blog/page";

const CakesPage: FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const recipes = await contentfulService.getAllRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.tags.includes('cake'));

  return (
    <main>
      <div className="section-description">
        <h1>Cakes</h1>
        <p>A slice of heaven in every recipe — find them all here.</p>
      </div>
      <ul className="cards gap-5">
        {filteredRecipes.sort((a, b) => a.name.localeCompare(b.name)).map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard {...recipe} />
          </li>
        ))}
      </ul>
    </main>
  );
};

export default CakesPage;
