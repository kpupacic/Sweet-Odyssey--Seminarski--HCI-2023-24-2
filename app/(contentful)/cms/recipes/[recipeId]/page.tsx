import { AwaitedReactNode, FC, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";
import Image from "next/image";
import contentfulService from "@/lib/contentfulClient";
import { TypeRecipeDetailItem } from "@/app/(contentful)/types/TypeRecipe";
import { Params } from "react-router-dom";

type Props = TypeRecipeDetailItem;

const RecipeFull: FC<Props> = ({
  name,
  image,
  author,
  ingredients,
  instructions
}) => (
  <div className="fullRecipe">
      <div className="fullRecipeHeader">
        <h1>{name}</h1>
        <p>Author: {author}</p>
      </div>
      <div className="fullRecipeImg">
        <Image
            src={image}
            layout="fill"
            objectFit="cover"
            alt={name}
        />
      </div>
      <hr />
      <div className="fullRecipeDetails">
        <div className="recipeDetails">
          <h3>Ingredients:</h3><br /> 
            <ul style={{ listStyleType: 'disc'}}>
              {ingredients.content[0].content.map((item: { content: { content: { value: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }[]; }[]; }, index: Key | null | undefined) => 
                  <li key={index}>{item.content[0].content[0].value}</li>
              )}
            </ul>
        </div>
        <div className="recipeDetails">
          <h3>Instructions:</h3><br />
          <ul style={{ listStyleType: 'decimal' }}>
            {instructions.content[0].content[0].value.split(/\n/).filter((instruction: string) => instruction.trim() !== '').map((instruction: string, instructionIndex: number) => 
              <li key={instructionIndex}>{instruction}</li>
            )}
          </ul>
        </div>
      </div>
  </div>
);

const RecipeIDPage = async ({ params }: { params: Params }) => {
  const recipeId = params.recipeId;
  const recipes = await contentfulService.getAllRecipes();
  const filteredRecipe = recipes.filter(recipe => recipe.id.includes(recipeId));

  if (!filteredRecipe || filteredRecipe.length === 0) {
      return <div>An error has occurred! This recipe cannot be fetched!</div>;
  }

  return (
      <main>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
              {filteredRecipe.map(recipe => (
                  <li key={recipe.id} style={{ marginBottom: '2em' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <h2 style={{ textAlign: 'center' }}>{recipe.title}</h2>
                          <RecipeFull {...recipe} />
                      </div>
                  </li>
              ))}
          </ul>
      </main>
  );
};

export default RecipeIDPage;