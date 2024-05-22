import { CategoriesListSkeletonComponent } from '@components/CategoriesList/CategoriesListSkeleton.component';
import { apiService } from '@core/api/api.service';
import { useRequest } from '@core/api/use-request.hook';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export function CategoriesListComponent() {
  const { data: categories, isLoading, error } = useRequest('categories', () => apiService.getCategories());

  return (
    <>
      {error && <p>Error: {String(error)}</p>}
      {isLoading && <CategoriesListSkeletonComponent />}

      {categories && (
        <List>
          {categories.results.map(({ id, key, name }) => (
            <ListItem key={id} disablePadding>
              <ListItemButton component={Link} to={`/categories/${key}`}>
                <ListItemText primary={name.en} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
