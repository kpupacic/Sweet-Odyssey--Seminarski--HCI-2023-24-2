import { FC } from "react";
import { RecipeCard } from "../page2";
import contentfulService from "@/lib/contentfulClient";
import { SearchParams } from "@/app/blog/page";

const OthersPage: FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const recipes = await contentfulService.getAllRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.tags.includes('other'));

  return (
    <main>
      <div className="section-description">
        <h1>Other recipes</h1>
        <p>A bit of everything — from unique dishes to hidden gems, all gathered in one place.</p>
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

export default OthersPage;
