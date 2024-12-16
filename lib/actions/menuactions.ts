export const getMenuItems = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOTNET_API_URL}/food`);
  const data = await response.json();
  return data;
};
