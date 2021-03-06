package codenames

import "github.com/katorek/codenames-pictures/webpack"

//import "github.com/kimrgrey/go-create-react-app/webpack"

// User represents current user session

// ViewData contains data for the view
type ViewData struct {
	assetsMapper        webpack.AssetsMapper
	SelectedGameID      string
	AutogeneratedGameID string
}

// NewViewData creates new data for the view
func (s *Server) NewViewData(id string, autogeneratedID string) (ViewData, error) {
	assetsMapper, err := webpack.NewAssetsMapper(s.buildPath)
	if err != nil {
		return ViewData{}, err
	}

	return ViewData{
		assetsMapper:        assetsMapper,
		SelectedGameID:      id,
		AutogeneratedGameID: autogeneratedID,
	}, nil
}

// Webpack maps file name to path
func (d ViewData) Webpack(file string) string {
	return d.assetsMapper(file)
}
