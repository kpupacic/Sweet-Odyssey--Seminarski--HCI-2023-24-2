// import SearchParams from "@/app/blog/page";
// import { FC } from "react";
// import { RecipeCard } from "../page2";
// import contentfulService from "@/lib/contentfulClient";

// const CakesPage: FC<SearchParams> = async ({ searchParams }) => {
//   const recipes = await contentfulService.getAllRecipes();
//   const filteredRecipes = recipes.filter(recipe => recipe.tags.includes('cake'));

//   return (
//     <main>
//       <ul className="cards gap-5">
//         {filteredRecipes.sort((a, b) => a.name.localeCompare(b.name)).map((recipe) => (
//           <li key={recipe.id}>
//             <RecipeCard {...recipe} />
//           </li>
//         ))}
//       </ul>
//     </main>
//   );
// };

// export default CakesPage;

import { FC } from "react";
import { RecipeCard } from "../page2";
import contentfulService from "@/lib/contentfulClient";
import { SearchParams } from "@/app/blog/page";

const CakesPage: FC<{ searchParams: SearchParams }> = async ({ searchParams }) => {
  const recipes = await contentfulService.getAllRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.tags.includes('cake'));

  return (
    <main>
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