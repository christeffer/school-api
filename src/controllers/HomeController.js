class HomeController {
  index(req, res) {
    res.json({ already: true });
  }
}
export default new HomeController();
